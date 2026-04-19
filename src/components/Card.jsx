import { useState, useEffect } from "react";

export default function Card({ item, variant = "a", priority = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareState, setShareState] = useState("idle");
  const artworkSlug = item.title
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  function buildArtworkUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("artwork", artworkSlug);
    return url;
  }

  function syncModalUrl(nextOpen) {
    const url = new URL(window.location.href);
    const selectedArtwork = url.searchParams.get("artwork");

    if (nextOpen) {
      url.searchParams.set("artwork", artworkSlug);
    } else if (selectedArtwork === artworkSlug) {
      url.searchParams.delete("artwork");
    }

    const nextSearch = url.searchParams.toString();
    const nextUrl = `${url.pathname}${nextSearch ? `?${nextSearch}` : ""}${url.hash}`;
    window.history.replaceState({}, "", nextUrl);
  }

  function openModal() {
    setIsModalOpen(true);
    syncModalUrl(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    syncModalUrl(false);
  }

  useEffect(() => {
    function syncModalFromUrl() {
      const selectedArtwork = new URLSearchParams(window.location.search).get(
        "artwork",
      );
      setIsModalOpen(selectedArtwork === artworkSlug);
    }

    syncModalFromUrl();
    window.addEventListener("popstate", syncModalFromUrl);

    return () => {
      window.removeEventListener("popstate", syncModalFromUrl);
    };
  }, [artworkSlug]);

  useEffect(() => {
    if (!isModalOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (shareState === "idle") return;

    const timeoutId = window.setTimeout(() => {
      setShareState("idle");
    }, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [shareState]);

  async function handleShare() {
    const shareUrl = buildArtworkUrl().toString();

    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title,
          text: `Take a look at ${item.title}`,
          url: shareUrl,
        });
        setShareState("shared");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
      }
    } catch {
      // Ignore dismissed share sheets; only surface successful actions visually.
    }
  }

  const shareLabel =
    shareState === "copied"
      ? "Link copied"
      : shareState === "shared"
        ? "Shared"
        : "Share artwork";

  return (
    <>
      <div className={`card-${variant} cards`}>
        <button
          type="button"
          className="image-button"
          onClick={openModal}
          aria-label={`Open larger view of ${item.title}`}
        >
          <img
            src={item.image}
            alt={item.title}
            loading={priority ? "eager" : "lazy"}
            onLoad={(e) => e.target.classList.add("loaded")}
          />
          <span className="image-overlay" aria-hidden="true">
            <span className="image-overlay__icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </span>
        </button>

        <div className={`card-body card-body-${variant}`}>
          <div className="meta-row">
            <p className="price">${item.price}</p>

            <div className="actions">
              <button
                type="button"
                className="action-button"
                onClick={openModal}
                aria-label={`Open ${item.title}`}
                title="Open artwork"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <button
                type="button"
                className="action-button"
                onClick={handleShare}
                aria-label={shareLabel}
                title={shareLabel}
              >
                <i
                  className={`fa-solid ${shareState === "idle" ? "fa-share" : "fa-check"}`}
                ></i>
              </button>
            </div>
          </div>

          <div className={variant === "b" ? "product-info" : ""}>
            <h3 className="artwork-title">{item.title}</h3>
            <p className="desc">{item.description}</p>
            <p className="scale">
              <span className="bold">Scale:</span> {item.scale}
            </p>
            <p className="medium">
              <span className="bold">Medium:</span> {item.medium}
            </p>

            <button
              type="button"
              className="view-details-button"
              onClick={openModal}
            >
              View art
            </button>
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          onClick={closeModal}
        >
          <div
            className="image-modal__content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="image-modal__close"
              onClick={closeModal}
              aria-label="Close enlarged image"
            >
              ×
            </button>
            <img
              className="image-modal__image"
              src={item.image}
              alt={item.title}
            />
            <div className="image-modal__details">
              <h3 className="artwork-title image-modal__title">{item.title}</h3>
              <p className="image-modal__description">{item.description}</p>
              <p className="image-modal__meta">
                <span className="bold">Scale:</span> {item.scale}
              </p>
              <p className="image-modal__meta">
                <span className="bold">Medium:</span> {item.medium}
              </p>
              <p className="image-modal__meta">
                <span className="bold">Price:</span> ${item.price}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const toCacheBustedUrl = (url, version) => {
  if (!url) return "";
  if (!version) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${version}`;
};
export const getCloudinaryImageUrl = (asset, fallback = "") => {
  if (!asset) return fallback;

  if (typeof asset === "string") {
    return asset;
  }
  const url = asset.secure_url || asset.secureUrl || asset.url || asset.path || asset.preview || fallback;
  return toCacheBustedUrl(url, asset.version);
};
export const getCloudinaryImageDetails = (asset) => {
  if (!asset || typeof asset === "string") return null;
  return {
    publicId: asset.public_id || asset.publicId || "",
    originalFilename: asset.original_filename || asset.originalFilename || asset.filename || "",
    width: asset.width || null,
    height: asset.height || null,
    format: asset.format || "",
    bytes: asset.bytes || null,
    version: asset.version || null,
  };
};

export const getCloudinaryAltText = (asset, fallback = "Image") => {
  if (!asset || typeof asset === "string") return fallback;

  return asset.original_filename || asset.originalFilename || asset.filename || fallback;
};

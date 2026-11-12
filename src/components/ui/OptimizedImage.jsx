const defaultWebpSource = (src) => (/\.webp$/i.test(src) ? null : src.replace(/\.(?:jpe?g|png)$/i, '.webp'))

export default function OptimizedImage({ src, webpSrc, alt, pictureClassName = 'contents', loading = 'lazy', decoding = 'async', ...imageProps }) {
  const optimizedSource = webpSrc === null ? null : (webpSrc || defaultWebpSource(src))
  return (
    <picture className={pictureClassName}>
      {optimizedSource && <source srcSet={optimizedSource} type="image/webp" />}
      <img src={src} alt={alt} loading={loading} decoding={decoding} {...imageProps} />
    </picture>
  )
}

import { ComponentPropsWithoutRef, ReactElement, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

// Skeleton shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const ImageContainer = styled.div<{ aspectRatio?: string, $borderRadius?: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ aspectRatio }) => aspectRatio || '16/9'};
  overflow: hidden;
  border-radius: ${({ $borderRadius }) => $borderRadius || '0.5rem'};

  background-color: ${({ theme }) => theme.color.lightGray};

  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledImage = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
`

const SkeletonPlaceholder = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.color.ghostWhite} 0%,
    ${({ theme }) => theme.color.lightGray} 50%,
    ${({ theme }) => theme.color.ghostWhite} 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`

const PlaceholderContainer = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.lightGray};
  color: ${({ theme }) => theme.color.gray};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`

const PlaceholderIcon = styled.svg`
  width: 48px;
  height: 48px;
  opacity: 0.5;
`

interface ImageProps extends Omit<ComponentPropsWithoutRef<'img'>, 'src'> {
  src: string
  alt: string
  aspectRatio?: string // e.g., '16/9', '4/3', '1/1'
  placeholderSrc?: string
  borderRadius?: string
  onLoad?: () => void
  onError?: () => void
}

export const Image = ({
  src,
  alt,
  aspectRatio,
  placeholderSrc,
  borderRadius,
  onLoad,
  onError,
  ...props
}: ImageProps): ReactElement => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Reset states when src changes
  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setIsLoaded(false)
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  const showSkeleton = isLoading && !hasError
  const showPlaceholder = hasError && !placeholderSrc

  return (
    <ImageContainer aspectRatio={aspectRatio} $borderRadius={borderRadius}>
      {/* Main image */}
      <StyledImage
        src={hasError && placeholderSrc ? placeholderSrc : src}
        alt={alt}
        $isLoaded={isLoaded}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Skeleton loader */}
      <SkeletonPlaceholder $isVisible={showSkeleton} />

      {/* Error placeholder */}
      <PlaceholderContainer $isVisible={showPlaceholder}>
        <PlaceholderIcon
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </PlaceholderIcon>
      </PlaceholderContainer>
    </ImageContainer>
  )
}

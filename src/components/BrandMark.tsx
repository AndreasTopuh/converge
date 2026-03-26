import Image from 'next/image';

interface BrandMarkProps {
  className?: string;
  size?: number;
  alt?: string;
}

export default function BrandMark({
  className = '',
  size = 48,
  alt = '',
}: BrandMarkProps) {
  return (
    <Image
      src="/converge-mark.svg"
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

import { ImagePlaceholder } from "@/shared/icons/image-placeholder";
import { cn } from "@/shared/lib";

interface ImagePreviewProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

const ImagePreview = ({
  src,
  alt = "preview",
  className,
}: ImagePreviewProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-outline">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn("size-full object-cover", className)}
        />
      ) : (
        <ImagePlaceholder className={className} />
      )}
    </div>
  );
};

export { ImagePreview };

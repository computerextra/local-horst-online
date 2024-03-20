import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-32 w-32 animate-spin rounded-full border-b-4 border-t-4 border-purple-500"></div>
      <Image
        src="/assets/images/loading.svg"
        className="h-28 w-28 rounded-full"
        alt="Ladeanimation"
      />
    </div>
  );
}

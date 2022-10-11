interface GameBannerProps {
  title: string;
  bannerURL: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className="mt-30 relative rounded-lg overflow-hidden hover:scale-110">
      <img className="w-48 h-56" src={props.bannerURL} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-g-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{props.title}</strong>
        <span className="text-zinc-300 text-sm block">
          {props.adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}

import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LineIcon,
  HatenaIcon,
  XIcon,
} from 'react-share'

export interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <TwitterShareButton url={url} title={title}>
        <XIcon size={32} round />
      </TwitterShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <HatenaShareButton url={url} title={title}>
        <HatenaIcon size={32} round />
      </HatenaShareButton>

      <LineShareButton url={url} title={title}>
        <LineIcon size={32} round />
      </LineShareButton>
    </div>
  )
}

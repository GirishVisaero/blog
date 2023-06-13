import Link from 'next/link';
import ImageWithTheme from './ImageWithTheme';
import Image from 'next/image'
import YouTube from 'react-youtube';


const NextImage = (props) => {
  return (
    <Image
      width={672}
      height={400}
      alt={props.alt}
      src={props.src}
      loading="lazy"
    />
  );
};

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} legacyBehavior>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};


const WatchOnYouTube = ({ videoId }) => {
  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};


const WatchOnYouTubeLink = (props) => {
  return (
    <div className="youtube flex items-center gap-2">
      <Image
        src="/youtube.png"
        alt="YouTube logo"
        width={30}
        height={30}
      ></Image>
      <a href={props.link} target="blank" rel="noopener noreferrer">
        {props?.text && <span>{props.text}</span>}
        {!props?.text && <span>Watch this step</span>}
      </a>
    </div>
  );
};

const MDXComponents = {
  a: CustomLink,
  ImageWithTheme,
  img: NextImage,
  WatchOnYouTube,
  WatchOnYouTubeLink
};

export default MDXComponents;

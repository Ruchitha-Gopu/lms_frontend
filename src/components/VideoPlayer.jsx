const VideoPlayer = ({ video }) => {
  return (
    <iframe
      width="100%"
      height="400"
      src={video}
      title="video"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
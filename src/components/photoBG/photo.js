import "../../index.css";
const Photo = (photo) => {
  const bg = photo.data.results[0].urls.full;
  console.log(bg);
  return (
    <>
      <div
        className="background"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      ></div>
    </>
  );
};
export default Photo;

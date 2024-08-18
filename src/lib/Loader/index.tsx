import "./styles.css";

interface LoaderProps {
  size: string;
}

export const Loader: React.FC<LoaderProps> = ({ size }) => {
  return (
    <>
      <div className={`loading-animation ${size || "normal"}`} />
    </>
  );
};

import "./styles.css";

/**
 * Create Loader component
 *
 * @component
 * @param {String} size - The size of the component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Render a Loader component
 * <Loader size={'small'||'normal'||'large'} />
 *
 */
export const Loader = ({ size }) => {
  return (
    <>
      <div className={`loading-animation ${size||"normal"}`} />
    </>
  );
}
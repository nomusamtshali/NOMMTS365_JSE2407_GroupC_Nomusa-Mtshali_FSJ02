/**
 * @module Skeleton
 * @description A customizable skeleton loader component for content placeholders.
 */

/**
 * Skeleton component for displaying loading placeholders.
 * @param {Object} props - The component props
 * @param {string} [props.height="h-6"] - The height class for the skeleton
 * @param {string} [props.width="w-full"] - The width class for the skeleton
 * @param {string} [props.className=""] - Additional CSS classes to apply to the skeleton
 * @returns {JSX.Element} The rendered Skeleton component
 */
const Skeleton = ({ height = "h-6", width = "w-full", className = "" }) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse rounded ${height} ${width} ${className}`}
    ></div>
  );
};

export default Skeleton;

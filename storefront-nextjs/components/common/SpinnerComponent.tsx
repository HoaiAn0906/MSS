import { animated, useSpring } from "@react-spring/web";

type Props = {
  show: boolean;
};

export default function SpinnerComponent({ show }: Props) {
  const springs = useSpring({
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
    loop: true,
    config: { duration: 1500 },
  });

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
      <animated.div
        style={springs}
        className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full"
      />
    </div>
  );
}

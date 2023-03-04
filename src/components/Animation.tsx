import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const Animation = (props: Props) => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    >
      {props.children}
    </motion.div>
  );
}

export default Animation;
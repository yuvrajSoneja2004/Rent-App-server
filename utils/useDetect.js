function useDetect(err) {
  return err.toString().split(" ")[2];
}

module.exports = useDetect;

export default function (res) {
  return (error) => {
    res.send(500, { error: error.message });
  };
}

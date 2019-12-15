export default function (event) {
  const { value, name } = event.target;

  this.setState({
    [name]: value,
  });
}

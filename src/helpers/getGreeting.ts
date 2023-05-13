export default function getGreeting() {
  const time = new Date().getHours();

  if (time >= 5 && time < 12) {
    return '早安';
  } else if (time >= 12 && time < 18) {
    return '午安';
  } else {
    return '晚安';
  }
}

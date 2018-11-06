export default function CollitionGravity(
  body1Y,
  body1Height,
  body2Y,
) {
  if (body1Y + body1Height >= body2Y - 1) {
    return true;
  } return false;
}

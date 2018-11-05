export default function Collition(
  body1X,
  body1Y,
  body1Width,
  body1Height,
  body2X,
  body2Y,
  body2Width,
  body2Height,
) {
  if (
    body1X + body1Width >= body2X
    && body1Y + body1Height >= body2Y
    && body1X <= body2X + body2Width
    && body1Y <= body2Y + body2Height
  ) {
    return true;
  } return false;
}

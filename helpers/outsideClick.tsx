export function handleClickOutside(
  event: any,
  ref,
  setState: (newState: boolean | ((prevState: boolean) => boolean)) => void
) {
  if (ref && ref.current && !ref.current.contains(event.target)) {
    setState(false);
  }
}

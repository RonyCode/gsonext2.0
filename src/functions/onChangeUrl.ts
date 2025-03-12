let previousPathname: string | null = null;

export function onChangeUrl(pathname: string) {
  const currentPathname = pathname;

  if (previousPathname === null) {
    previousPathname = currentPathname;
    return false;
  }

  const hasChanged = previousPathname !== currentPathname;
  previousPathname = currentPathname;

  return hasChanged;
}

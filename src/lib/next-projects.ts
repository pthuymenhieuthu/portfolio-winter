type ProjectLink = {
  href?: string;
  title: string;
};

/**
 * Returns the projects immediately following the current case study in the
 * homepage order, wrapping back to the start when needed.
 */
export function getNextProjects<T extends ProjectLink>(
  projects: readonly T[],
  currentHref: string,
  limit = 3
): T[] {
  const homepageProjects = projects.filter(
    (project) => project.title !== "ZanZan"
  );
  const currentIndex = homepageProjects.findIndex(
    (project) => project.href === currentHref
  );

  if (currentIndex < 0) {
    return homepageProjects.slice(0, limit);
  }

  const ordered = [
    ...homepageProjects.slice(currentIndex + 1),
    ...homepageProjects.slice(0, currentIndex),
  ];

  return ordered.slice(0, limit);
}

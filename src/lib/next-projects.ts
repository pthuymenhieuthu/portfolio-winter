type ProjectLink = {
  href?: string;
  title: string;
};

export function getVisibleProjects<T extends ProjectLink>(projects: readonly T[]): T[] {
  const projectOrder: Record<string, number> = {
    "/blog/affina": 0,
    "/blog/affina-product-design": 1,
    "/blog/medhunt": 2,
    "/blog/4oranges": 4,
    "/blog/zoan": 5,
    "/blog/chande": 6,
  };
  const priority = (project: ProjectLink) =>
    projectOrder[project.href ?? ""] ?? 7;

  return [...projects]
    .filter((project) => project.href !== "/blog/mcdonalds-kiosk")
    .sort(
      (a, b) => priority(a) - priority(b)
    );
}

/**
 * Returns the projects immediately following the current case study in the
 * homepage order, wrapping back to the start when needed.
 */
export function getNextProjects<T extends ProjectLink>(
  projects: readonly T[],
  currentHref: string,
  limit = 3
): T[] {
  const homepageProjects = getVisibleProjects(projects).filter(
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

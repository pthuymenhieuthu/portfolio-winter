type ProjectLink = {
  href?: string;
  title: string;
};

// Temporarily hide these case studies while their designs are being updated.
const HIDDEN_PROJECT_HREFS = new Set([
  "/blog/4oranges",
]);

export function getVisibleProjects<T extends ProjectLink>(projects: readonly T[]): T[] {
  const projectOrder: Record<string, number> = {
    "/blog/medhunt": 0,
    "/blog/affina": 1,
    "/blog/affina-partner-flow": 2,
    "/blog/zoan": 3,
    "/blog/chande": 4,
  };
  const priority = (project: ProjectLink) =>
    projectOrder[project.href ?? ""] ?? 5;

  return projects
    .filter((project) => !HIDDEN_PROJECT_HREFS.has(project.href ?? ""))
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

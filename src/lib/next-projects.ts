type ProjectLink = {
  href?: string;
  title: string;
};

// Temporarily hide these case studies while their designs are being updated.
const HIDDEN_PROJECT_HREFS = new Set([
  "/blog/affina-partner-flow",
  "/blog/4oranges",
]);

export function getVisibleProjects<T extends ProjectLink>(projects: readonly T[]): T[] {
  const priority = (project: ProjectLink) =>
    project.href === "/blog/medhunt" ? 0 : project.href === "/blog/affina" ? 1 : project.href === "/blog/zoan" ? 2 : project.href === "/blog/chande" ? 3 : 4;

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

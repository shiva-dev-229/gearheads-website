export interface TerminalLine {
  type: 'prompt' | 'output' | 'comment' | 'error' | 'blank'
  text: string
}

export interface TerminalBlock {
  id: string
  label?: string
  lines: TerminalLine[]
}

export interface Module {
  id: string
  slug: string
  number: string
  title: string
  description: string
  body: string[]
  terminals: TerminalBlock[]
  tip?: string
  concepts: string[]
}

export const modules: Module[] = [
  {
    id: 'module-1',
    slug: 'repository-basics',
    number: '01',
    title: 'Repository Basics',
    description: 'Set up a shared codebase your entire team can clone, push to, and track.',
    body: [
      'Git runs on your machine — it tracks your code history locally. GitHub hosts that history in the cloud so your whole team can sync. They\'re separate tools that work together.',
      'Fork the official FtcRobotController repo, rename it for your team, and clone it. Every programmer gets the full history instantly. No shared drives, no emailed zip files.',
    ],
    terminals: [
      {
        id: 't1-1',
        label: 'Clone your team repo',
        lines: [
          { type: 'comment', text: '# Replace your-team with your GitHub organization name' },
          { type: 'prompt', text: 'git clone https://github.com/your-team/FtcRobotController' },
          { type: 'output', text: "Cloning into 'FtcRobotController'..." },
          { type: 'prompt', text: 'cd FtcRobotController' },
        ],
      },
      {
        id: 't1-2',
        label: 'Verify remote origin',
        lines: [
          { type: 'prompt', text: 'git remote -v' },
          { type: 'output', text: 'origin  https://github.com/your-team/FtcRobotController (fetch)' },
          { type: 'output', text: 'origin  https://github.com/your-team/FtcRobotController (push)' },
        ],
      },
    ],
    tip: 'Add a .gitignore tuned for Android before your first commit. Android Studio generates .gradle/, build/, and local.properties that must not be committed.',
    concepts: ['git clone', 'git remote', 'remote origin', '.gitignore', 'fork'],
  },

  {
    id: 'module-2',
    slug: 'branching',
    number: '02',
    title: 'Branching & Collaboration',
    description: 'Let multiple programmers work simultaneously without blocking each other.',
    body: [
      'Branches keep work-in-progress off the main codebase. main should always compile — never push half-finished code directly to it.',
      'Pick a naming convention and stick to it: feat/ for new features, fix/ for patches, comp/ for competition snapshots. You\'ll thank yourself when debugging in the pit at 7am.',
    ],
    terminals: [
      {
        id: 't2-1',
        label: 'Create a feature branch',
        lines: [
          { type: 'prompt', text: 'git checkout -b feat/odometry-localizer' },
          { type: 'output', text: "Switched to a new branch 'feat/odometry-localizer'" },
        ],
      },
      {
        id: 't2-2',
        label: 'Push to remote',
        lines: [
          { type: 'prompt', text: 'git push -u origin feat/odometry-localizer' },
          { type: 'output', text: "Branch 'feat/odometry-localizer' set up to track remote branch 'feat/odometry-localizer' from 'origin'." },
        ],
      },
      {
        id: 't2-3',
        label: 'List all branches',
        lines: [
          { type: 'prompt', text: 'git branch -a' },
          { type: 'output', text: '* feat/odometry-localizer' },
          { type: 'output', text: '  main' },
          { type: 'output', text: '  remotes/origin/main' },
          { type: 'output', text: '  remotes/origin/feat/odometry-localizer' },
        ],
      },
    ],
    tip: 'Never commit directly to main. Enable branch protection rules on GitHub to block direct pushes — enforces review on every change.',
    concepts: ['git branch', 'git checkout -b', 'git push -u', 'branch naming', 'branch protection'],
  },

  {
    id: 'module-3',
    slug: 'commits',
    number: '03',
    title: 'Commits & History',
    description: 'Write commit messages that explain decisions, not just changes.',
    body: [
      'One commit, one change. If your commit fixes a bug and refactors a class at the same time, split it. Each commit should make sense on its own.',
      'Use conventional prefixes: feat:, fix:, chore:. The diff shows what changed — the message explains why. A clean git log is your best debugging tool during competition week.',
    ],
    terminals: [
      {
        id: 't3-1',
        label: 'Stage a specific file',
        lines: [
          { type: 'comment', text: '# Stage only files relevant to this change' },
          { type: 'prompt', text: 'git add TeamCode/src/main/java/org/firstinspires/ftc/teamcode/DriveSubsystem.java' },
        ],
      },
      {
        id: 't3-2',
        label: 'Commit with a clear message',
        lines: [
          { type: 'prompt', text: 'git commit -m "feat: replace dead-reckoning with three-wheel odometry"' },
          { type: 'output', text: '[feat/odometry-localizer 3c8a1f2] feat: replace dead-reckoning with three-wheel odometry' },
          { type: 'output', text: ' 1 file changed, 22 insertions(+), 8 deletions(-)' },
        ],
      },
      {
        id: 't3-3',
        label: 'Review recent history',
        lines: [
          { type: 'prompt', text: 'git log --oneline -5' },
          { type: 'output', text: '3c8a1f2 feat: replace dead-reckoning with three-wheel odometry' },
          { type: 'output', text: 'b91d0e4 chore: add Road Runner dependency to build.gradle' },
          { type: 'output', text: 'a3f19c2 fix: correct encoder direction on right intake motor' },
        ],
      },
    ],
    tip: 'Use git add -p (interactive staging) to split a large change into multiple focused commits. Each commit should make sense independently.',
    concepts: ['git add -p', 'git commit', 'conventional commits', 'git log --oneline', 'atomic commits'],
  },

  {
    id: 'module-4',
    slug: 'conflicts',
    number: '04',
    title: 'Conflict Resolution',
    description: 'Understand and resolve merge conflicts when two branches edit the same file.',
    body: [
      'A conflict happens when two branches changed the same lines. Git pauses the merge and marks both versions in the file — you pick which one to keep (or combine both), then delete the markers.',
      '<<<<<<< HEAD is your code. >>>>>>> is the incoming branch. Edit, delete the markers, then commit. Conflicts are normal workflow — they\'re not emergencies.',
    ],
    terminals: [
      {
        id: 't4-1',
        label: 'Merge produces a conflict',
        lines: [
          { type: 'prompt', text: 'git merge feat/autonomous' },
          { type: 'error', text: 'CONFLICT (content): Merge conflict in TeleopDrive.java' },
          { type: 'error', text: 'Automatic merge failed; fix conflicts and then commit.' },
        ],
      },
      {
        id: 't4-2',
        label: 'Conflict markers in the file',
        lines: [
          { type: 'comment', text: '# Choose which version to keep, then delete these markers' },
          { type: 'output', text: '<<<<<<< HEAD' },
          { type: 'output', text: '    private static final double DRIVE_SPEED = 0.8;' },
          { type: 'output', text: '=======' },
          { type: 'output', text: '    private static final double DRIVE_SPEED = 0.75;' },
          { type: 'output', text: '>>>>>>> feat/autonomous' },
        ],
      },
      {
        id: 't4-3',
        label: 'Stage resolution and commit',
        lines: [
          { type: 'comment', text: '# After editing to remove markers:' },
          { type: 'prompt', text: 'git add TeleopDrive.java' },
          { type: 'prompt', text: 'git commit -m "merge: reconcile DRIVE_SPEED between drivetrain and autonomous branches"' },
        ],
      },
    ],
    tip: 'If a merge becomes complicated, abort it cleanly with git merge --abort. It restores the pre-merge state — safe to use at any point during resolution.',
    concepts: ['git merge', 'conflict markers', 'git merge --abort', 'manual resolution'],
  },

  {
    id: 'module-5',
    slug: 'pull-requests',
    number: '05',
    title: 'Pull Requests & Review',
    description: 'Require peer review before any code reaches the competition branch.',
    body: [
      'A PR is a proposal to merge your branch into main. Teammates review it on GitHub — they comment on specific lines, request changes, and approve before anything merges.',
      'Code review catches bugs before they run on a $500 robot. With branch protection enabled, no one merges their own code without approval. Every change gets a second set of eyes.',
    ],
    terminals: [
      {
        id: 't5-1',
        label: 'Open a pull request',
        lines: [
          { type: 'prompt', text: 'gh pr create --base main --title "feat: three-wheel odometry localizer" --body "Replaces dead-reckoning with encoder-based pose tracking."' },
          { type: 'output', text: 'https://github.com/your-team/FtcRobotController/pull/14' },
        ],
      },
      {
        id: 't5-2',
        label: 'Merge after approval',
        lines: [
          { type: 'prompt', text: 'gh pr merge 14 --squash' },
          { type: 'output', text: '✓ Squashed and merged pull request #14' },
        ],
      },
    ],
    tip: 'Set up a CODEOWNERS file to auto-assign reviewers based on which files changed. OpMode files can require review from the lead programmer automatically.',
    concepts: ['gh pr create', 'code review', 'branch protection', 'CODEOWNERS', 'squash merge'],
  },

  {
    id: 'module-6',
    slug: 'ci-cd',
    number: '06',
    title: 'CI / CD & Automation',
    description: 'Automatically verify every push compiles before it reaches the field.',
    body: [
      'GitHub Actions runs automated workflows on every push or PR — on GitHub\'s servers, with no local setup. Workflows are YAML files in .github/workflows/.',
      'The most useful FTC workflow: run Gradle assembleDebug on every push. If the Android build fails, the PR gets flagged before anyone reviews it. Catches bad imports and SDK errors in under two minutes.',
    ],
    terminals: [
      {
        id: 't6-1',
        label: '.github/workflows/build.yml',
        lines: [
          { type: 'output', text: 'name: Android Build Check' },
          { type: 'blank', text: '' },
          { type: 'output', text: 'on:' },
          { type: 'output', text: '  push:' },
          { type: 'output', text: '  pull_request:' },
          { type: 'blank', text: '' },
          { type: 'output', text: 'jobs:' },
          { type: 'output', text: '  build:' },
          { type: 'output', text: '    runs-on: ubuntu-latest' },
          { type: 'output', text: '    steps:' },
          { type: 'output', text: '      - uses: actions/checkout@v4' },
          { type: 'output', text: '      - uses: actions/setup-java@v4' },
          { type: 'output', text: "        with: { java-version: '17', distribution: temurin }" },
          { type: 'output', text: '      - run: ./gradlew assembleDebug' },
        ],
      },
      {
        id: 't6-2',
        label: 'Check recent workflow runs',
        lines: [
          { type: 'prompt', text: 'gh run list --limit 3' },
          { type: 'output', text: 'STATUS  WORKFLOW             BRANCH                    AGE' },
          { type: 'output', text: '✓       Android Build Check  main                       8m 33s' },
          { type: 'output', text: '✓       Android Build Check  feat/odometry-localizer    2m 04s' },
          { type: 'error', text: '✗       Android Build Check  feat/sample-detector       1m 58s' },
        ],
      },
    ],
    tip: 'Require the build check to pass before a PR can be merged. This ensures main always compiles — configure it in repository Settings > Branch protection rules.',
    concepts: ['GitHub Actions', '.github/workflows/', 'Gradle build', 'gh run list', 'CI pipeline'],
  },

  {
    id: 'module-7',
    slug: 'documentation',
    number: '07',
    title: 'Documentation',
    description: 'Write a README judges can skim and JavaDoc rookies can actually learn from.',
    body: [
      'Judges and new members read your README first. In 90 seconds it should explain your robot, how to build and deploy, your OpModes, and hardware config.',
      'Put JavaDoc on every OpMode class. Future seasons need to know why constants exist, not just what they are. Commit docs with the code — treat them as part of the change, not an afterthought.',
    ],
    terminals: [
      {
        id: 't7-1',
        label: 'JavaDoc on an OpMode class',
        lines: [
          { type: 'comment', text: '/**' },
          { type: 'comment', text: ' * AutonRoutine — 3-cycle high basket for INTO THE DEEP.' },
          { type: 'comment', text: ' * @author Lead Programmer' },
          { type: 'comment', text: ' * @version 2024-11-03' },
          { type: 'comment', text: ' */' },
          { type: 'output', text: '@Autonomous(name = "AutonRoutine", group = "GEarheads")' },
          { type: 'output', text: 'public class AutonRoutine extends LinearOpMode {' },
        ],
      },
      {
        id: 't7-2',
        label: 'Trace a decision with git blame',
        lines: [
          { type: 'prompt', text: 'git blame -L 42,48 TeleopDrive.java' },
          { type: 'output', text: '3c8a1f2e (ftc-lead  2024-10-28 18:03 -0600 42)     private static final double DRIVE_SPEED = 0.75;' },
          { type: 'output', text: 'a3f19c2b (ftc-lead  2024-11-01 19:42 -0600 44)     private OdometryLocalizer localizer;' },
        ],
      },
    ],
    tip: 'Use git blame to answer "why does this line exist?" without asking teammates. Every commit message and author becomes part of the permanent answer.',
    concepts: ['README', 'JavaDoc', '@Autonomous', 'git blame', 'engineering notebook'],
  },
]

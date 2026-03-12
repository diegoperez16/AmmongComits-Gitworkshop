export interface Mission {
  id: string;
  mission_id: string;
  title: string;
  description: string;
  category: 'default' | 'detective' | 'unlocked';
  difficulty: string;
  badge: string;
  whatYouLearn: string;
  steps: string[];
  claimedBy: string | null;
  claimedAt: string | null;
  completedBy: string[];
  evidence?: string;
  storyPart?: string;
}

export const STORY_PARTS = {
  team: "The Neon Runner game was developed by a team of 5 talented developers: Vivi, Carlos, Pierre, Diego, and one mysterious contributor. They worked together for months, building the game from scratch.",
  culprit: "After investigating the git history, a pattern emerges. All the breaking commits trace back to one developer. But who is this saboteur?",
  sabotage: "The bugs weren't accidents - they were deliberate. Someone sabotaged the coin rendering, enemy speeds, scoring system, and more. Each change broke something critical.",
  evidence: "By examining the commits in detail, you can see the saboteur's strategy: subtle changes to game mechanics that looked innocent but completely broke gameplay. But their identity remains hidden.",
  secretMessage: "A secret message was hidden in the repository - in the most unexpected place. Finding it reveals the culprit's real name: Alfredo. The clues were there all along, hidden in plain sight.",
  tension: "Why would Alfredo do this? Looking at the commit timeline and team communications, it becomes clear: he felt overlooked and undervalued by the team despite his contributions.",
  resolution: "Through Git investigation, you've uncovered the whole story. By reverting his sabotage commits and discovering his hidden message, the game is fixed. The team now understands what happened and can address the real issue - making everyone feel valued."
};

export const MISSIONS: Mission[] = [
  // DEFAULT MISSIONS - Everyone must complete these
  {
    id: '1',
    mission_id: 'default-1',
    title: 'Clone and Run',
    description: 'Clone the repository and get the game running',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'SETUP',
    whatYouLearn: 'WHAT: git clone downloads a complete copy of a repository to your computer.\n\nWHY: This is how you start working on any existing project - you need the code locally to view, edit, and run it.',
    steps: [
      'git clone <repo-url> — the link is at the top of this page',
      'Create a virtual environment: python3 -m venv venv',
      'Activate it: source venv/bin/activate (Mac/Linux) or venv\\Scripts\\activate (Windows)',
      'Install dependencies: pip install -r requirements.txt',
      'Run: python3 main.py',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '2',
    mission_id: 'default-2',
    title: 'Make a Branch',
    description: 'Create your own branch and push it to remote',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'BRANCH',
    whatYouLearn: 'WHAT: Branches let you work on features separately from the main code.\n\nWHY: Essential for team collaboration - everyone works on their own branch without breaking main. Like having your own workspace.',
    steps: [
      'There are two ways to create a branch — one command or two. Look up git checkout -b',
      'Make any change to README.md so you have something to commit',
      'Think about the order: you need to stage, then commit, then push',
      'Pushing a new branch for the first time needs an extra flag — try git push --help',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '3',
    mission_id: 'default-3',
    title: 'Git Status Check',
    description: 'Learn to check the status of your repository',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'INFO',
    whatYouLearn: 'WHAT: git status shows what files changed, what\'s staged, and what branch you\'re on.\n\nWHY: Your "where am I?" command - always know what you\'ve changed before committing.',
    steps: [
      'Run git status before and after making a change — what\'s different?',
      'Stage the file and run git status again — does the output change?',
      'There\'s a command that shows the actual lines that changed, not just which files',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '4',
    mission_id: 'default-4',
    title: 'Stage and Commit',
    description: 'Master the staging area and commit process',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'STAGE',
    whatYouLearn: 'WHAT: Staging (git add) prepares changes, commit saves them to history.\n\nWHY: Lets you organize changes into logical snapshots. Like packing boxes before moving - stage what belongs together.',
    steps: [
      'What\'s the difference between git add <filename> and git add . ?',
      'Check git status after staging — notice how the output changes',
      'After committing, verify it exists in history with git log --oneline',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '5',
    mission_id: 'default-5',
    title: 'View File History',
    description: 'See all changes made to a specific file',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'HIST',
    whatYouLearn: 'WHAT: git log shows commit history with authors, dates, and messages.\n\nWHY: Understand how code evolved, find who made changes, and track down when bugs were introduced.',
    steps: [
      'git log can be filtered to a single file — how would you do that?',
      'There\'s a flag that shows the actual code diff inside each commit',
      'git blame shows who last touched each line — try it on main.py',
      'git log -S"some_text" searches for commits that added or removed that exact text',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '37',
    mission_id: 'default-6',
    title: 'Start From Scratch',
    description: 'Initialize a new repository and connect to remote',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'INIT',
    whatYouLearn: 'WHAT: git init creates a new repository, git remote connects it to GitHub/etc.\n\nWHY: Start tracking any project with version control. Remotes let you backup and share your work.',
    steps: [
      'Start with an empty folder — what command initializes a git repo?',
      'You\'ll need at least one commit before you can push anywhere',
      'How do you tell git where the remote is? Look up git remote add',
      'git remote -v shows you what remotes are configured',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '27',
    mission_id: 'default-7',
    title: 'Experiment Safely',
    description: 'Create a feature branch to try changing the game without breaking main',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'MERGE',
    whatYouLearn: 'WHAT: git merge combines changes from one branch into another.\n\nWHY: Safely integrate your feature work back into main. If experiments fail, main is untouched.',
    steps: [
      'Create a branch, make a change in game/constants.py, and commit it',
      'Switch back to main — notice your change disappears. Why?',
      'How do you bring changes from one branch into another?',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '28',
    mission_id: 'default-8',
    title: 'Keep History Clean',
    description: 'Use rebase to organize your game modifications before sharing',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'REBASE',
    whatYouLearn: 'WHAT: git rebase moves your commits to start after another branch\'s commits.\n\nWHY: Creates cleaner, linear history. Makes code reviews easier and git log more readable.',
    steps: [
      'Make commits on a feature branch, then make a separate commit on main',
      'Now look at git log --oneline --graph --all — what does the history look like?',
      'Rebase your feature branch onto main, then check the graph again — what changed?',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '29',
    mission_id: 'default-9',
    title: 'Time Travel Through Code',
    description: 'Create versions then jump between them using HEAD~',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'REFS',
    whatYouLearn: 'WHAT: HEAD~1 means "1 commit before current", HEAD~2 means "2 commits before".\n\nWHY: Quick navigation through history without memorizing commit hashes. Essential for debugging.',
    steps: [
      'Make a few commits with different values so you have history to navigate',
      'HEAD~1 means one commit back — what does HEAD~3 do?',
      'You\'ll get a "detached HEAD" warning — that\'s expected, not an error',
      'To get back to the present: git checkout main',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '30',
    mission_id: 'default-10',
    title: 'Borrow Good Ideas',
    description: 'Copy a specific commit from one branch to another',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'CHERRY',
    whatYouLearn: 'WHAT: git cherry-pick copies a specific commit from anywhere to your current branch.\n\nWHY: Grab that one bug fix or feature without merging everything. Surgical precision for commits.',
    steps: [
      'Create two branches, each with a different change — don\'t merge them',
      'How do you get the hash of a commit on another branch?',
      'git cherry-pick <hash> copies just that commit — verify only that change appears',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '31',
    mission_id: 'default-11',
    title: 'Polish Your Changes',
    description: 'Clean up messy commits before sharing',
    category: 'default',
    difficulty: 'Advanced',
    badge: 'INTERACTIVE',
    whatYouLearn: 'WHAT: git rebase -i lets you reorder, edit, squash, or reword commits interactively.\n\nWHY: Turn messy work-in-progress commits into clean, professional history before sharing.',
    steps: [
      'Make 3+ messy commits, then run git rebase -i HEAD~3',
      'In the editor: reword renames a commit, squash merges it into the one above, drop removes it',
      'Save and close the editor — git will walk you through any rewording',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '32',
    mission_id: 'default-12',
    title: 'Undo Experiments',
    description: 'Create then undo commits using branch forcing',
    category: 'default',
    difficulty: 'Advanced',
    badge: 'FORCE',
    whatYouLearn: 'WHAT: git branch -f and git reset move branch pointers to different commits.\n\nWHY: Undo mistakes by rewinding history. Powerful but use carefully - changes history!',
    steps: [
      'Make some commits you\'d want to undo — then check git log',
      'git reset moves your branch pointer — what flag makes it truly discard changes?',
      'Warning: this rewrites history. What would happen if someone else had pulled these commits?',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '33',
    mission_id: 'default-13',
    title: 'Choose Your Undo',
    description: 'Learn three levels of undo: soft, mixed, hard',
    category: 'default',
    difficulty: 'Advanced',
    badge: 'RESET',
    whatYouLearn: 'WHAT: --soft keeps changes staged, --mixed unstages them, --hard deletes everything.\n\nWHY: Different undo levels for different situations. Choose how much you want to erase.',
    steps: [
      'After each reset, run git status — where did the changes end up?',
      '--soft: commit undone, changes still staged. --mixed: unstaged. --hard: gone entirely',
      'When would you want --soft vs --hard? Think about real scenarios',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '34',
    mission_id: 'default-14',
    title: 'Mark Milestones',
    description: 'Create game versions and tag them for easy access',
    category: 'default',
    difficulty: 'Beginner',
    badge: 'TAG',
    whatYouLearn: 'WHAT: git tag marks important commits with memorable names like v1.0.\n\nWHY: Easy reference to releases, stable versions, or important milestones. Better than memorizing commit hashes.',
    steps: [
      'Make a few commits with different values, tagging each one',
      'git tag with no arguments lists all your tags',
      'Can you jump to a tagged version the same way you\'d checkout a branch?',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '35',
    mission_id: 'default-15',
    title: 'Peek at History',
    description: 'Create history then safely explore it in detached HEAD',
    category: 'default',
    difficulty: 'Intermediate',
    badge: 'DETACHED',
    whatYouLearn: 'WHAT: Detached HEAD means you\'re viewing a specific commit, not a branch.\n\nWHY: Safely explore old code without changing branches. Make experimental changes without affecting branches.',
    steps: [
      'Make a few commits, then grab an old commit hash from git log --oneline',
      'git checkout <hash> puts you in detached HEAD — what does that warning mean?',
      'Make a change here. If you switch away without saving to a branch, what happens to it?',
      'To keep your experiment: create a branch before leaving detached HEAD',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  
  // DETECTIVE MISSIONS - Investigation missions
  {
    id: '6',
    mission_id: 'detective-1',
    title: 'List All Collaborators',
    description: 'Find all developers who worked on this project',
    category: 'detective',
    difficulty: 'Easy',
    badge: 'TEAM',
    whatYouLearn: 'Using git log to find contributors',
    steps: [
      'git log shows author info — how can you extract just names and deduplicate them?',
      'Try piping git log output through sort and uniq',
      'Want commit counts per person? uniq -c counts occurrences',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'team'
  },
  {
    id: '7',
    mission_id: 'detective-2',
    title: 'Count the Files',
    description: 'How many files compose the game?',
    category: 'detective',
    difficulty: 'Easy',
    badge: 'FILES',
    whatYouLearn: 'Exploring repository structure',
    steps: [
      'Explore the structure with ls and ls game/',
      'How would you find and count only .py files recursively?',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '9',
    mission_id: 'detective-5',
    title: 'Fix: Coins Not Visible',
    description: 'Find the commit that broke coin rendering and revert it',
    category: 'detective',
    difficulty: 'Easy',
    badge: 'COIN',
    whatYouLearn: 'Using git log and git show to find bugs',
    steps: [
      'Which file is responsible for drawing things on screen? Start its history there',
      'git show <hash> shows you exactly what a commit changed — look for something suspicious',
      'Once you find the bad commit, git revert <hash> undoes it without erasing history',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'sabotage'
  },
  {
    id: '10',
    mission_id: 'detective-6',
    title: 'Fix: Enemies Too Fast',
    description: 'Find and revert the commit that made enemies too fast',
    category: 'detective',
    difficulty: 'Easy',
    badge: 'SPEED',
    whatYouLearn: 'Using git blame to track changes',
    steps: [
      'You know what string changed — can you search git history for it?',
      'git log -S"some_text" finds commits that added or removed that exact text',
      'Once you find it, how do you safely undo a specific commit without rewriting history?',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'sabotage'
  },
  {
    id: '8',
    mission_id: 'detective-3',
    title: 'Identify the Saboteur',
    description: 'Analyze commit history to find who made suspicious changes',
    category: 'detective',
    difficulty: 'Medium',
    badge: 'SEARCH',
    whatYouLearn: 'Using git log to track authors and patterns',
    steps: [
      'Look at git log --oneline — do any commit messages stand out as unusual?',
      'You can filter commits by author: git log --author="name"',
      'Use git show <hash> to see what each suspicious commit actually changed',
      'The commit username might not be the person\'s real name — keep that in mind',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'culprit'
  },
  {
    id: '11',
    mission_id: 'detective-7',
    title: 'Fix: Score Goes Down',
    description: 'Find and revert the commit that broke scoring',
    category: 'detective',
    difficulty: 'Easy',
    badge: 'SCORE',
    whatYouLearn: 'Using git log with file paths',
    steps: [
      'The scoring logic lives in game/player.py — look at its commit history',
      'git log -- <filepath> filters to only commits that touched that file',
      'Inspect commits with git show <hash> — look at the add_score method closely',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'evidence'
  },
  {
    id: '12',
    mission_id: 'detective-8',
    title: 'Fix: Player Never Dies',
    description: 'Find and revert the commit that broke the damage system — health gets set instead of reduced',
    category: 'detective',
    difficulty: 'Medium',
    badge: 'DAMAGE',
    whatYouLearn: 'Using git log with file paths',
    steps: [
      'Look at game/player.py history — focus on the take_damage method',
      'The change is a single character difference — subtle but completely game-breaking',
      'Once found, revert it and test: does the player die now?',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'evidence'
  },
  {
    id: '38',
    mission_id: 'detective-4',
    title: 'The Hidden Message',
    description: 'Find the file the saboteur accidentally committed to uncover their real name',
    category: 'detective',
    difficulty: 'Hard',
    badge: 'SECRET',
    whatYouLearn: 'Exploring repository files and finding hidden content',
    steps: [
      'Look at the repo root carefully — does every file belong in a game project?',
      'Something was also deleted from git history. Can you find what\'s missing? (git log --diff-filter=D)',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'secretMessage'
  },
  {
    id: '13',
    mission_id: 'detective-9',
    title: 'Fix: Backwards Controls',
    description: 'Find and revert the commit that reversed the controls',
    category: 'detective',
    difficulty: 'Medium',
    badge: 'CONTROL',
    whatYouLearn: 'Using git log with grep patterns',
    steps: [
      'Play the game and notice what feels wrong about movement',
      'The move() function in game/player.py is responsible — look at its history',
      'The change is in how two variables are used — what should go where?',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'tension'
  },
  {
    id: '14',
    mission_id: 'detective-10',
    title: 'The Pattern Emerges',
    description: 'Analyze all the breaking commits - what connects them?',
    category: 'detective',
    difficulty: 'Hard',
    badge: 'PATTERN',
    whatYouLearn: 'Connecting the dots in git history',
    steps: [
      'Look at all the bad commits you\'ve found — what do they have in common?',
      'Check the author, timestamps, and commit message style across all of them',
      'git log --grep="keyword" filters commits by message content',
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'resolution'
  },
  
  // UNLOCKED MISSIONS
  {
    id: '15',
    mission_id: 'unlocked-1',
    title: 'Master Coin Collector',
    description: 'Play the game and collect 67 coins without dying',
    category: 'unlocked',
    difficulty: 'Challenge',
    badge: 'PLAY',
    whatYouLearn: 'Playing a working game!',
    steps: [
      'Make sure all detective missions are fixed',
      'Play and collect exactly 67 coins',
      'Take a screenshot of your score',
      'Bonus: Can you get 150 points?'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '16',
    mission_id: 'unlocked-2',
    title: 'Ultimate Survivor',
    description: 'Stay alive for 90 seconds without dying',
    category: 'unlocked',
    difficulty: 'Challenge',
    badge: 'SURVIVE',
    whatYouLearn: 'Game balance and survival skills',
    steps: [
      'Fix all bugs first',
      'Survive for 90 seconds straight',
      'Note your final score',
      'Bonus: Can you survive 2 minutes?'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
  {
    id: '17',
    mission_id: 'unlocked-3',
    title: 'Add Power-Up System',
    description: 'Implement a new feature: collectible power-ups',
    category: 'unlocked',
    difficulty: 'Advanced',
    badge: 'POWERUP',
    whatYouLearn: 'Adding new features to existing code',
    steps: [
      'Create a new PowerUp class',
      'Add power-up spawning logic',
      'Implement power-up effects (speed boost, shield, etc.)',
      'Test thoroughly and commit'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
  },
];

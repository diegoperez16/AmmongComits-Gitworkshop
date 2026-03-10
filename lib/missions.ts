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
      'Clone: git clone <repo-url>   (see the Game Repository link at the top of this page)',
      'Navigate: cd Neon-Runner-Artifact-Heist',
      'Create virtualenv: python3 -m venv venv',
      'Activate: source venv/bin/activate (Mac/Linux) or venv\\Scripts\\activate (Windows)',
      'Install dependencies: pip install -r requirements.txt',
      'Run: python3 main.py   A game window should open — play for 30 seconds!'
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
      'Create branch: git checkout -b <your-name>',
      'Or: git branch <your-name> then git checkout <your-name>',
      'Make any small change to README.md',
      'Stage: git add README.md',
      'Commit: git commit -m "Added my name"',
      'Push: git push -u origin <your-name>'
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
      'Check status: git status',
      'Make a small change to README.md',
      'Check again: git status (see modified file)',
      'See exact changes: git diff',
      'See changes for specific file: git diff README.md'
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
      'Modify a file or create new one',
      'Stage it: git add <filename>',
      'Stage all changes: git add .',
      'Check staged: git status',
      'Commit: git commit -m "Your descriptive message"',
      'See commit: git log --oneline'
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
      'File history: git log -- main.py',
      'With changes: git log -p -- main.py',
      'Who changed what: git blame main.py',
      'Pretty format: git log --oneline --graph --all',
      'Search history: git log -S"search_term"'
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
      'Create folder: mkdir my-test-repo && cd my-test-repo',
      'Initialize: git init',
      'Create file: echo \"# Test\" > README.md',
      'Stage: git add README.md',
      'First commit: git commit -m \"Initial commit\"',
      'Add remote: git remote add origin <url>',
      'View remotes: git remote -v'
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
      'Create experiment branch: git checkout -b my-experiment',
      'Change PLAYER_CHAR in game/constants.py to something fun',
      'Commit your change: git commit -am "trying new player"',
      'Return to main: git checkout main',
      'See your change is gone! Merge it: git merge my-experiment'
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
      'Create branch: git checkout -b feature-additions',
      'Make 2 small changes to the game (colors, speeds, etc)',
      'Meanwhile, main gets updated - simulate with git checkout main',
      'Return to feature: git checkout feature-additions',
      'Rebase onto main: git rebase main',
      'Your changes now appear after main updates!'
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
      'Make 3 quick commits: change PLAYER_CHAR to X, then O, then @',
      'Check history: git log --oneline (see your 3 commits)',
      'Go back one: git checkout HEAD~1 (now player is O)',
      'Go back two: git checkout HEAD~2 (now player is X)',
      'Back to latest: git checkout main (player is @ again)',
      'Create branch at version 2: git branch old-version HEAD~2'
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
      'Branch A: git checkout -b speed-test, change SPEED=5, commit',
      'Branch B: git checkout -b color-test, change BG_COLOR=blue, commit',
      'Back to main: git checkout main',
      'Get just the speed fix: git cherry-pick speed-test',
      'Check game/constants.py - speed changed but not color!'
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
      'Make 3 commits: "fix", "oops", "actually fix" (change SPEED each time)',
      'Messy history! Clean it: git rebase -i HEAD~3',
      'Try "reword" to rename "fix" to "Update game speed"',
      'Use "squash" to merge "oops" into previous commit',
      'Save and exit - now you have 2 clean commits!'
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
      'Create test branch: git checkout -b experiment',
      'Make 2 "bad" commits (set SPEED=999, then SPEED=0)',
      'Oops! Force branch back: git branch -f experiment HEAD~2',
      'Or from main: git reset --hard HEAD~1 (if you committed there)',
      'Check git log - those commits are gone!'
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
      'Make commit: change BG_COLOR and commit',
      'Soft undo: git reset --soft HEAD~1 (git status: still staged!)',
      'Commit again, then: git reset --mixed HEAD~1 (unstaged now)',
      'Stage and commit, then: git reset --hard HEAD~1 (totally gone!)',
      'Each reset level gives different control over your changes'
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
      'Make commit with SPEED=3, tag it: git tag v1.0-slow',
      'Make commit with SPEED=5, tag it: git tag v1.1-medium',
      'Make commit with SPEED=8, tag it: git tag v1.2-fast',
      'View tags: git tag (see all three!)',
      'Jump back: git checkout v1.0-slow (speed is 3 again!)'
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
      'Make 3 commits changing PLAYER_CHAR: first "A", then "B", then "C"',
      'Get commit hash: git log --oneline (copy the "A" commit hash)',
      'Jump there: git checkout <hash> (detached HEAD warning - OK!)',
      'Check constants.py - it shows "A"! Make a test change',
      'Save it: git branch test-branch, then git checkout main',
      'Your main still has "C", test-branch has your experiment!'
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
      'Use git log --format="%an" | sort | uniq to list all authors',
      'Count how many commits each person made',
      'Submit evidence: List all collaborators names'
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
      'Use ls -R or find to list all files',
      'Count Python files specifically',
      'Look in game/ directory',
      'Submit evidence: Total number of .py files'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: []
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
      'Use git log --all --oneline to see all commits',
      'Use git log --author="<name>" to filter by author',
      'Check each developer\'s commits for file changes',
      'Look for patterns in timing and files modified',
      'Note: The commits show a username, but is this their real name?',
      'Submit evidence: Username found in the suspicious commits'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'culprit'
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
      'List all files in the repo root: ls -la',
      'One file does not belong in a game project — open it',
      'Read it carefully: cat WORKING_NOTES.txt',
      'Scroll to the very bottom of the file',
      'Submit evidence: The real name signed at the bottom',
      'Bonus: A deleted file is also hiding in git history — try: git log --all --diff-filter=D --name-only --format="" | grep -v "^$"'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'secretMessage'
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
      'Use git log -- main.py to see main.py commit history',
      'Use git show <hash> to inspect each commit — look at the Draw artifacts section',
      'Find the commit that replaced the blit call with pass',
      'Revert the bad commit: git revert <hash>',
      'Keep "Revert" in the commit message (default is fine)',
      'Submit evidence: Commit hash'
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
      'Use git log --all -S"ENEMY_SPEED" to find speed changes',
      'Use git show <hash> to see what changed',
      'Identify commit that changed ENEMY_SPEED from 150 to 600',
      'Revert it: git revert <hash>',
      'Keep "Revert" in the commit message',
      'Submit evidence: Commit hash and author'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'sabotage'
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
      'Use git log -- game/player.py to see player.py history',
      'Look for commits about scoring or add_score',
      'Use git show to find commit that changed += to -=',
      'Revert the bad commit: git revert <hash>',
      'Keep "Revert" in the commit message',
      'Submit evidence: Commit hash and culprit'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'sabotage'
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
      'Use git log -- game/player.py to see player.py history',
      'Use git show <hash> to inspect each commit',
      'Find the commit that changed take_damage — look at the -= vs = operator',
      'Revert it: git revert <hash>',
      'Keep "Revert" in the commit message',
      'Submit evidence: Commit hash'
    ],
    claimedBy: null,
    claimedAt: null,
    completedBy: [],
    storyPart: 'sabotage'
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
      'Use git log -- game/player.py to see player movement history',
      'Use git show <hash> on commits that touched the move() method',
      'Find the commit that swapped dx and dy — moving right now moves down',
      'Revert it: git revert <hash>',
      'Keep "Revert" in the commit message',
      'Submit evidence: Date and author of commit'
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
      'List all reverted commits: git log --grep="Revert" --oneline',
      'Or see your revert history: git log --all --oneline | grep "Revert"',
      'Use git show <hash> on each original bad commit',
      'Check the author for each: Do they all share the same author?',
      'Check when these commits were made - same timeframe?',
      'Submit evidence: Summary of the pattern you found'
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

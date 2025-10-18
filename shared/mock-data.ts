import type { Module, Achievement, LeaderboardEntry } from './types';
export const MOCK_MODULES: Module[] = [
  {
    id: 'dna-structure',
    title: 'The Structure of DNA',
    description: 'Learn about the double helix, base pairing, and the fundamental building blocks of life.',
    steps: [
      {
        type: 'text',
        title: 'What is DNA?',
        content: "DNA, or Deoxyribonucleic acid, is the molecule that carries the genetic instructions for the development, functioning, growth, and reproduction of all known organisms and many viruses. It's the blueprint of life!",
      },
      {
        type: 'text',
        title: 'The Double Helix',
        content: "DNA has a famous shape called a double helix, which looks like a twisted ladder. The sides of the ladder are made of a sugar-phosphate backbone, and the rungs are made of pairs of nitrogenous bases.",
      },
      {
        type: 'dna-builder',
        title: 'Build a DNA Strand',
        content: "Let's build a DNA strand! Drag the correct bases from the bottom to complete the complementary strand. Remember the pairing rules: Adenine (A) pairs with Thymine (T), and Cytosine (C) pairs with Guanine (G).",
      },
      {
        type: '3d-viewer',
        title: 'Explore the 3D Model',
        content: "Now, let's see the DNA molecule in 3D. You can click and drag to rotate the model, and use your mouse wheel to zoom in and out. Notice the elegant twist of the double helix.",
      },
      {
        type: 'quiz',
        title: 'Knowledge Check: DNA Structure',
        quiz: [
          {
            question: 'In the DNA double helix, which base pairs with Adenine (A)?',
            choices: [
              { text: 'Guanine (G)', isCorrect: false },
              { text: 'Cytosine (C)', isCorrect: false },
              { text: 'Thymine (T)', isCorrect: true },
              { text: 'Uracil (U)', isCorrect: false },
            ],
            explanation: 'Adenine (A) always pairs with Thymine (T) in DNA through two hydrogen bonds.',
          },
          {
            question: 'What is the shape of a DNA molecule called?',
            choices: [
              { text: 'Single Strand', isCorrect: false },
              { text: 'Triple Helix', isCorrect: false },
              { text: 'Alpha Sheet', isCorrect: false },
              { text: 'Double Helix', isCorrect: true },
            ],
            explanation: 'The structure of DNA is a double helix, resembling a twisted ladder, as discovered by Watson and Crick.',
          },
        ],
      },
    ],
  },
  {
    id: 'dna-replication',
    title: 'DNA Replication',
    description: 'Explore how DNA makes a perfect copy of itself before cell division.',
    steps: [
      {
        type: 'text',
        title: 'Why Replicate?',
        content: 'Before a cell divides, it must first copy its entire genome so that each resulting daughter cell has a complete set of genetic instructions. This process is called DNA replication.',
      },
      {
        type: 'text',
        title: 'Semi-Conservative Replication',
        content: 'DNA replication is "semi-conservative." This means that each new DNA molecule consists of one old, conserved strand of DNA, and one newly synthesized strand.',
      },
      {
        type: 'dna-replication-animation',
        title: 'Visualizing Replication',
        content: 'Watch the key players in action! See the enzyme Helicase unwind the DNA, and then watch as DNA Polymerase builds the new strands, one continuously (the leading strand) and one in fragments (the lagging strand).',
      },
      {
        type: 'text',
        title: 'Real-World Application: PCR',
        content: "The principles of DNA replication are the foundation for the Polymerase Chain Reaction (PCR) technique. PCR is used in labs worldwide to amplify tiny amounts of DNA for genetic testing, forensic analysis, and medical diagnostics.",
      },
      {
        type: 'quiz',
        title: 'Knowledge Check: Replication',
        quiz: [
          {
            question: 'What is the role of the enzyme Helicase in DNA replication?',
            choices: [
              { text: 'It synthesizes the new DNA strand.', isCorrect: false },
              { text: 'It unwinds and separates the two DNA strands.', isCorrect: true },
              { text: 'It joins DNA fragments together.', isCorrect: false },
              { text: 'It proofreads the new DNA.', isCorrect: false },
            ],
            explanation: 'Helicase acts like a zipper, unwinding the DNA double helix to expose the template strands for replication.',
          },
          {
            question: 'DNA replication is described as semi-conservative because:',
            choices: [
              { text: 'Only half of the DNA is copied.', isCorrect: false },
              { text: 'It is not a very accurate process.', isCorrect: false },
              { text: 'Each new DNA molecule has one old strand and one new strand.', isCorrect: true },
              { text: 'It only happens in some cells.', isCorrect: false },
            ],
            explanation: 'The semi-conservative model means each of the two new DNA molecules contains one of the original parental strands and one newly synthesized strand.',
          },
        ],
      },
    ],
  },
  {
    id: 'transcription',
    title: 'Transcription: DNA to RNA',
    description: 'Discover how the genetic code in DNA is copied into a messenger RNA (mRNA) molecule.',
    steps: [
      {
        type: 'text',
        title: 'The Central Dogma',
        content: 'The central dogma of molecular biology describes the two-step process, transcription and translation, by which the information in genes flows into proteins: DNA → RNA → protein. Transcription is the first step.',
      },
      {
        type: 'text',
        title: 'What is Transcription?',
        content: "Transcription is the process of creating a complementary RNA copy of a sequence of DNA. This copy, called messenger RNA (mRNA), carries the genetic information needed to make proteins from the nucleus to the cytoplasm.",
      },
      {
        type: 'transcription-animation',
        title: 'Visualizing Transcription',
        content: 'Watch as the enzyme RNA Polymerase unwinds the DNA and synthesizes a strand of mRNA. Notice how Uracil (U) is used instead of Thymine (T) in the RNA strand.',
      },
      {
        type: 'quiz',
        title: 'Knowledge Check: Transcription',
        quiz: [
          {
            question: 'What is the primary enzyme responsible for transcription?',
            choices: [
              { text: 'DNA Polymerase', isCorrect: false },
              { text: 'Helicase', isCorrect: false },
              { text: 'RNA Polymerase', isCorrect: true },
              { text: 'Ribosome', isCorrect: false },
            ],
            explanation: 'RNA Polymerase is the key enzyme that synthesizes RNA from a DNA template.',
          },
          {
            question: 'In RNA, which base replaces Thymine (T)?',
            choices: [
              { text: 'Adenine (A)', isCorrect: false },
              { text: 'Guanine (G)', isCorrect: false },
              { text: 'Cytosine (C)', isCorrect: false },
              { text: 'Uracil (U)', isCorrect: true },
            ],
            explanation: 'RNA uses Uracil (U) in place of Thymine (T) to pair with Adenine (A).',
          },
        ],
      },
    ],
  },
  {
    id: 'translation',
    title: 'Translation: RNA to Protein',
    description: 'Understand how mRNA is used as a template to synthesize proteins, the workhorses of the cell.',
    steps: [
      {
        type: 'text',
        title: 'From Code to Protein',
        content: "Translation is the final step of the central dogma. It's the process where the genetic code carried by mRNA is decoded to produce a specific sequence of amino acids in a polypeptide chain, which then folds into a protein.",
      },
      {
        type: 'text',
        title: 'The Ribosome',
        content: "This process occurs in the cytoplasm, on a large molecular machine called a ribosome. The ribosome reads the mRNA sequence in three-base 'codons' and recruits corresponding transfer RNA (tRNA) molecules.",
      },
      {
        type: 'translation-animation',
        title: 'Visualizing Translation',
        content: 'Watch as the ribosome moves along the mRNA strand. See how tRNA molecules, each carrying a specific amino acid, match with the codons and add their amino acid to the growing protein chain.',
      },
      {
        type: 'text',
        title: 'Real-World Application: mRNA Vaccines',
        content: "mRNA vaccines (like those for COVID-19) work by giving your cells a temporary mRNA blueprint. Your own ribosomes then translate this mRNA to produce a harmless piece of the virus, teaching your immune system how to recognize and fight it.",
      },
      {
        type: 'quiz',
        title: 'Knowledge Check: Translation',
        quiz: [
          {
            question: 'Where does translation occur in a eukaryotic cell?',
            choices: [
              { text: 'Nucleus', isCorrect: false },
              { text: 'Mitochondria', isCorrect: false },
              { text: 'Cytoplasm (on ribosomes)', isCorrect: true },
              { text: 'Golgi Apparatus', isCorrect: false },
            ],
            explanation: 'Translation occurs in the cytoplasm, where ribosomes are located. The mRNA travels from the nucleus to the cytoplasm for this process.',
          },
          {
            question: 'What is a three-base sequence on mRNA that codes for an amino acid called?',
            choices: [
              { text: 'An anticodon', isCorrect: false },
              { text: 'A gene', isCorrect: false },
              { text: 'A chromosome', isCorrect: false },
              { text: 'A codon', isCorrect: true },
            ],
            explanation: 'The ribosome reads the mRNA in three-base units called codons. Each codon specifies a particular amino acid (or a stop signal).',
          },
        ],
      },
    ],
  },
  {
    id: 'gene-to-protein',
    title: 'From Gene to Protein',
    description: 'A capstone module that ties everything together, from DNA code to a functional protein.',
    steps: [
      {
        type: 'text',
        title: 'The Complete Journey',
        content: "You've learned about DNA, replication, transcription, and translation. Now let's put it all together. A gene is a specific sequence of DNA that contains the instructions to build a specific protein.",
      },
      {
        type: 'text',
        title: 'From Chain to Shape',
        content: "After translation, the long chain of amino acids (the polypeptide) isn't functional yet. It must fold into a precise, complex three-dimensional shape to become an active protein. This shape is critical to its function.",
      },
      {
        type: 'protein-folding-animation',
        title: 'The Magic of Folding',
        content: "Watch as a simple chain of amino acids spontaneously folds into its complex, functional structure. This process is driven by the chemical properties of the amino acids in the chain.",
      },
      {
        type: 'quiz',
        title: 'Final Knowledge Check',
        quiz: [
          {
            question: 'What is the correct flow of genetic information according to the central dogma?',
            choices: [
              { text: 'Protein → RNA → DNA', isCorrect: false },
              { text: 'DNA → Protein → RNA', isCorrect: false },
              { text: 'DNA → RNA → Protein', isCorrect: true },
              { text: 'RNA → DNA → Protein', isCorrect: false },
            ],
            explanation: 'The central dogma states that information flows from DNA to RNA (transcription) and then to protein (translation).',
          },
          {
            question: "What determines a protein's function?",
            choices: [
              { text: 'Its color', isCorrect: false },
              { text: 'Its specific 3D shape', isCorrect: true },
              { text: 'The number of genes it has', isCorrect: false },
              { text: 'The size of the cell', isCorrect: false },
            ],
            explanation: "A protein's function is critically dependent on its unique, folded three-dimensional structure. If it misfolds, it usually becomes inactive.",
          },
        ],
      },
    ],
  },
  {
    id: 'virtual-lab-crispr',
    title: 'Virtual Lab: CRISPR',
    description: 'A hands-on challenge using the revolutionary CRISPR-Cas9 gene-editing tool.',
    steps: [
      {
        type: 'text',
        title: 'The Gene Editing Revolution',
        content: "CRISPR-Cas9 is a powerful gene-editing technology that allows scientists to make precise changes to the DNA of living organisms. It's often described as 'molecular scissors' and has revolutionized biological research.",
      },
      {
        type: 'text',
        title: 'How It Works',
        content: "The system uses a guide RNA (gRNA) to find a specific target sequence in the DNA. The Cas9 enzyme then acts like scissors, cutting the DNA at that exact location. This allows scientists to remove, add, or alter genes.",
      },
      {
        type: 'crispr-animation',
        title: 'Challenge: Edit a Gene',
        content: "Your mission is to use the CRISPR-Cas9 system to target and cut a specific DNA sequence. This is the first step in correcting a genetic mutation.",
      },
      {
        type: 'quiz',
        title: 'Knowledge Check: CRISPR',
        quiz: [
          {
            question: 'What is the function of the "guide RNA" (gRNA) in the CRISPR-Cas9 system?',
            choices: [
              { text: 'It cuts the DNA.', isCorrect: false },
              { text: 'It provides energy for the reaction.', isCorrect: false },
              { text: 'It finds and binds to the target DNA sequence.', isCorrect: true },
              { text: 'It repairs the DNA after it is cut.', isCorrect: false },
            ],
            explanation: 'The guide RNA is like a GPS, directing the Cas9 enzyme to the precise location on the genome that needs to be edited.',
          },
          {
            question: 'What is the role of the Cas9 protein?',
            choices: [
              { text: 'To act as "molecular scissors" and cut the DNA.', isCorrect: true },
              { text: 'To create the guide RNA.', isCorrect: false },
              { text: 'To read the DNA sequence.', isCorrect: false },
              { text: 'To fold the protein.', isCorrect: false },
            ],
            explanation: 'Cas9 is an enzyme (a nuclease) that cuts both strands of the DNA at the site specified by the guide RNA.',
          },
        ],
      },
    ],
  },
];
export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Steps',
    description: 'Completed your first lesson step.',
    icon: 'Footprints',
  },
  {
    id: 'dna-builder-master',
    title: 'Helix Architect',
    description: 'Successfully built a DNA strand.',
    icon: 'Puzzle',
  },
  {
    id: 'dna-structure-module-complete',
    title: 'DNA Novice',
    description: 'Completed the DNA Structure module.',
    icon: 'Dna',
  },
  {
    id: 'dna-replication-module-complete',
    title: 'Replication Expert',
    description: 'Completed the DNA Replication module.',
    icon: 'Copy',
  },
  {
    id: 'transcription-module-complete',
    title: 'RNA Scribe',
    description: 'Completed the Transcription module.',
    icon: 'Atom',
  },
  {
    id: 'translation-module-complete',
    title: 'Protein Pioneer',
    description: 'Completed the Translation module.',
    icon: 'TestTube',
  },
  {
    id: 'gene-to-protein-module-complete',
    title: 'Synthesis Master',
    description: 'Completed the Gene to Protein module.',
    icon: 'Shapes',
  },
  {
    id: 'virtual-lab-crispr-module-complete',
    title: 'CRISPR Expert',
    description: 'Completed the Virtual Lab: CRISPR module.',
    icon: 'Scissors',
  },
  {
    id: 'perfect-quiz',
    title: 'Perfect Score',
    description: 'Achieved 100% on any quiz.',
    icon: 'Target',
  },
  {
    id: 'all-modules-complete',
    title: 'Biology Buff',
    description: 'Completed all available modules.',
    icon: 'GraduationCap',
  },
];
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Marie Curie', modulesCompleted: 5, averageScore: 100 },
  { rank: 2, name: 'Rosalind Franklin', modulesCompleted: 5, averageScore: 98 },
  { rank: 3, name: 'Ada Lovelace', modulesCompleted: 4, averageScore: 95 },
  { rank: 4, name: 'Grace Hopper', modulesCompleted: 4, averageScore: 92 },
  { rank: 5, name: 'Katherine Johnson', modulesCompleted: 3, averageScore: 100 },
  { rank: 6, name: 'You', modulesCompleted: 2, averageScore: 88 },
  { rank: 7, name: 'Charles Darwin', modulesCompleted: 2, averageScore: 85 },
  { rank: 8, name: 'Gregor Mendel', modulesCompleted: 1, averageScore: 80 },
];
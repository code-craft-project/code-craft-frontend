export const logoSVG = '/images/logo.svg';
export const userProfilePicture = '/images/profile.jpg';
export const organizationProfilePicture = '/images/organization-profile.jpg';
export const eventLogoPicture = '/images/event-picture.jpg';
export const arrowShapeImage = '/images/arrow-shape-image.png'

export const CODE_HISTORY_KEY = 'code_history';

export const styles = {
    active: "bg-gradient-to-br",
    from: "from-primary-blue",
    from_prc: "from-15%",
    to: "to-primary-yellow",
    to_prc: "to-55%",
};

export const challengesTopics: ChallengeTopic[] = ['all topics', 'problem solving', 'algorithms', 'data structures', 'databases'];
export const challengeLevels: ChallengeLevel[] = ["easy", "medium", "hard"];
export const testCaseInputTypes: TestCaseInputType[] = ["string", "number", "boolean", "array_of_strings", "array_of_numbers", "array_of_booleans"];

export const supportedLanguages: SupportedLanguages[] = ['c', 'c++', 'javascript', 'php', 'python'];
export const javascriptTemplate = `/*
@params
*/

function main(INPUTS){
    // Code
}

`;

export const cTemplate = `/*
@params
*/

void start(INPUTS){
    // Code

}`;

export const cppTemplate = `/*
@params
*/

class Program {
public:
    void run(INPUTS){
        // Code
    }
};
`;

export const phpTemplate = `<?php 
/*
@params
*/

function main(INPUTS) {
    // Code
}
?>`;

export const pythonTemplate = `"""
@params
"""

def main(INPUTS):
    # Code
  
`;

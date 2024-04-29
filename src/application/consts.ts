export const userProfilePicture = '/images/profile.jpg';
export const organizationProfilePicture = '/images/organization-profile.jpg';

export const styles = {
    active: "bg-gradient-to-br",
    from: "from-primary-blue",
    from_prc: "from-15%",
    to: "to-primary-yellow",
    to_prc: "to-55%",
};

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

import React from "react";
import PageWrapper from "components/PageWrapper";

const Home: React.FC = () => {
    return (
        <PageWrapper color="#1b86a7" title="Home">
            Portal 2 is a 2011 puzzle-platform game developed by Valve for
            Windows, macOS, Linux, PlayStation 3, and Xbox 360. The digital PC
            versions are distributed online by Valve's Steam service, while all
            retail editions are distributed by Electronic Arts. A port for the
            Nintendo Switch was released as part of the Portal: Companion
            Collection in June 2022.
            <br />
            <br />
            Like the original Portal (2007), players solve puzzles by placing
            portals and teleporting between them. Portal 2 adds features
            including tractor beams, lasers, light bridges, and paint-like gels
            that alter player movement or allow portals to be placed on any
            surface. In the single-player campaign, players control Chell, who
            navigates the dilapidated Aperture Science Enrichment Center during
            its reconstruction by the supercomputer GLaDOS (Ellen McLain); new
            characters include robot Wheatley (Stephen Merchant) and Aperture
            founder Cave Johnson (J. K. Simmons). In the new cooperative mode,
            players solve puzzles together as robots Atlas and P-Body (both
            voiced by Dee Bradley Baker). Jonathan Coulton and the National
            produced songs for the game.
        </PageWrapper>
    );
};

export default Home;

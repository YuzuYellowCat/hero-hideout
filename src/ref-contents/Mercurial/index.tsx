import React from "react";
import RefContentsWrapper from "components/RefContentsWrapper";

const MercurialRefContents: React.FC = () => {
    return (
        <RefContentsWrapper>
            <h3>Main Ref</h3>
            <img
                src={require(`images/refs/mercurial/full-front-back.jpeg`)}
                alt="A drawing of the villain Mercurial!"
            />
            <p>
                Mercurial is an occult themed goat supervillain who likes to
                find ways to cause chaos and frustrate and dominate hero
                do-gooders.
            </p>
            <h4>Info</h4>
            <ul>
                <li>
                    <b>Age</b>: 32
                </li>
                <li>
                    <b>Pronouns</b>: he/him
                </li>
                <li>
                    <b>Orientation</b>: Bisexual
                </li>
                <li>
                    <b>Strengths</b>: Tricky, Defensive, Manipulative
                </li>
                <li>
                    <b>Weaknesses</b>: Raw Strength can overpower him, he
                    struggles when things become more than a 1v1
                </li>
            </ul>
            <h4>Powers</h4>
            <p>He has 3 core powers:</p>
            <p>
                <b>Mind Reading</b>: Basically, like, pick any object in the
                room and focus on looking at it. If he does that to a living
                creature, he is able to read their mind.
            </p>
            <p>
                <b>Holographic Projection</b>: He has the ability to create any
                non-solid projection within a large radius of him. Projections
                can't by physical in any way so can't do damage, so he mostly
                uses them along with mind reading to mess with a hero as much as
                possible and confuse them.
            </p>
            <p>
                <b>Summoning Circle</b>: A ring of 6 tentacles appear at his
                feet that he can control, each about 8ft in length -- pretty
                short range but helpful in attacking and restraining a hero if
                he can get close enough.
            </p>
            <p>
                During fights, he can analyze the thoughts of anyone who he is
                fighting to anticipate their plans, and then use his projection
                skills to foil those plans or confuse the hero as much as
                possible. Then, in close range, he can use his summoning circle
                ability to assist with fighting, along with anticipate how they
                want to attack which means he can dodge any traps or incoming
                attacks
            </p>
            <h4>Motivations</h4>
            <p>
                He finds the concepts of heroes annoying and pointless, and he's
                out to prove it and have fun in the process. His goal in a fight
                is to both mess with any heroes both physically and mentally —
                meaning if he catches any enjoyment being had out of defeat thru
                mind reading, he sure as hell is going to exploit that and have
                fun messing with the hero.
            </p>
            <h4>Personality</h4>
            <p>
                He's definitely the type of villain who enjoys being
                over-the-top evil, and loves the power of taking down the heroes
                and what they represent. He's got a bit of a screw loose, and
                just wants to cause pain and/or humiliation to whoever he faces.
            </p>
            <p>Ref drawn by me!</p>
        </RefContentsWrapper>
    );
};

export default MercurialRefContents;

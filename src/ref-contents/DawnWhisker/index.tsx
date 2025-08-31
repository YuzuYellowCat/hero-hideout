import RefContentsWrapper from "components/RefContentsWrapper";
import React from "react";
import Link from "components/Link";

const DawnWhiskerRefContents: React.FC = () => {
    return (
        <RefContentsWrapper>
            <h3>Main Ref</h3>
            <img
                src={require(`images/refs/dawnwhisker/main-ref.jpeg`)}
                alt="The main reference page for the hero DawnWhisker"
            />
            <p>
                DawnWhisker is a cheerful, over-the-top hero who tries his very
                best to be the coolest hero the world has ever seen!
            </p>
            <h4>Info</h4>
            <ul>
                <li>
                    <b>Age</b>: 26
                </li>
                <li>
                    <b>Pronouns</b>: he/him
                </li>
                <li>
                    <b>Orientation</b>: Bisexual
                </li>
                <li>
                    <b>Strengths</b>: Tenacious, Resilient, Over-the-top
                    cheerful
                </li>
                <li>
                    <b>Weaknesses</b>: Easily overpowered, Rushes in without
                    thinking, Kind of annoying
                </li>
            </ul>
            <h4>Powers</h4>
            <p>
                His power is portal creation, but in a limited capacity (which I
                have comms occasionaly break, but rule of cool y'know xD)
            </p>
            <p>
                He's able to spend a few seconds to draw a portal frame, but
                once that frame is down somewhere he's able to instantly connect
                any two frames he can think of by pushing his hands together. So
                pretty much -- thrives in situations he's able to set up a bunch
                of portals, but struggles if he is taken off guard (cuz no
                portals are set up). His powers can be used in some fun ways
                (like, he can put a portal on a large flat surface and move it
                around during a fight to like catch projectiles and send them
                back at his opponent). Also has some smaller super strength,
                durability, and recovery powers but that's mostly so I can
                justify him getting into fights all the time and still being
                mostly fine haha
            </p>
            <h4>Role</h4>
            <p>
                He acts as a scout for the hero agency he works for. He's often
                using his portals to patrol an area. He is a first responder
                that can get a read on what type of villain is there, and get
                the right heroes on the scen as quickly as possible.
            </p>
            <h4>Personality</h4>
            <p>
                He is over-the-top energetic, extremely eager to be a hero and
                really wants to look cool despite his frequent clumsiness. This
                means he's easily tricked and will try to do the "cool hero"
                thing without fully thinking through it. Also means he's able to
                get really beat up and he'll keep on getting up and trying to
                fight back even if he's clearly outmatched.
            </p>
            <p>
                Ref drawn by{" "}
                <Link href="https://bsky.app/profile/imdanuki.bsky.social">
                    imdanuki
                </Link>
            </p>
        </RefContentsWrapper>
    );
};

export default DawnWhiskerRefContents;

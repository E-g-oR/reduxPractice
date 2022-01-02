## Cases:
- ### Create new Developer:
    1. search for free Mentor
    2. assign developer to that Mentor

- ### Create new Mentor:
    1. Check if any Mentor has more than 1 Developer.
    If so:
        1. remove one Developer from that Mentor
        2. assign that Developer to new Mentor

- ### Delete Mentor:
    1. unassign all Developers of that Mentor
    2. assign all those developers to others Mentors

- ### Delete Developer:
    1. remove that Developer from his Mentor

- ### Developer became Mentor:
    1. delete that Developer
    2. create new Mentor with prev userId

- ### Mentor became Developer:
    1. delete that Mentor
    2. create new Develper with prev userId
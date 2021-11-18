import Subject from "./Subject";

interface Observer {
    // Receive update from subject.
    update(subject: Subject): void;
}

export default Observer;
type QueueNode<T> = {
  next?: QueueNode<T>,
  value: T,
};

type QueueType<T> = {
  enqueue: (value: T) => void,
  dequeue: () => T,
  peek: () => T | undefined,
  getHead: () => QueueNode<T> | undefined,
  getLast: () => QueueNode<T> | undefined,
}

export default <T>(head: QueueNode<T>|undefined = undefined, last: QueueNode<T>|undefined = undefined): QueueType<T> => {
  return (
    Object.freeze({
      enqueue(value: T) {
        const link: QueueNode<T> = { value, next: undefined };
        if (head && last) {
          last.next = link;
        }
        else {
          head = link;
        }
      },
      dequeue() {
        if (head) {
          const value: T = head.value;
          head = head.next;
          return value;
        }
      },
      peek() { return head?.value; },
      getHead() { return head; },
      getLast() { return last; },
    }) as QueueType<T>
  );
};

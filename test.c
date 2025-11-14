#include <stdio.h>    // for printf() function
#include <stdbool.h>  // to use 'bool', 'true', and 'false' data types

// ------------------------
// Step 1: Define the Test-and-Set Function
// ------------------------

// This function does two things at once (atomically):
// 1. It "tests" (reads) the current value of the lock.
// 2. It "sets" the lock to true (meaning: locked).
// Then it returns the old value before changing it.
//
// For example:
// If the lock was false (free), it will become true (taken),
// and the function will return false (old value).
//
// If the lock was already true (taken), it stays true,
// and the function will return true (old value).
bool TestAndSet(bool *target) {
    bool old = *target;   // store the old value (either true or false)
    *target = true;       // now set the lock to true (locked)
    return old;           // return what the old value was
}

// ------------------------
// Step 2: Create a Global Lock Variable
// ------------------------

// This variable is shared by all parts of the program.
// It represents whether the lock is free or taken.
bool lock = false; // 'false' means no one is holding the lock yet

// ------------------------
// Step 3: Function to Acquire (Take) the Lock
// ------------------------

// This function tries to take the lock.
// It uses the TestAndSet() function.
// If someone else already has the lock, it keeps waiting (busy waiting)
// until the lock becomes free.
void acquire_lock() {
    // 'while' loop repeats as long as TestAndSet(&lock) returns 'true'
    // which means the lock is already taken.
    while (TestAndSet(&lock)) {
        // Busy waiting (spinlock)
        // The program keeps looping here until the lock becomes false again.
    }
    // When TestAndSet(&lock) finally returns false,
    // it means we successfully acquired the lock!
}

// ------------------------
// Step 4: Function to Release (Free) the Lock
// ------------------------

// When a process or thread finishes using the shared resource,
// it should release the lock by setting it back to false.
void release_lock() {
    lock = false;  // now others can take the lock
}

// ------------------------
// Step 5: Main Function (Program Starts Here)
// ------------------------

int main() {
    // Step 5.1: Show that process 1 wants to enter the critical section
    printf("Process 1 trying to acquire lock...\n");

    // Step 5.2: Try to take the lock
    acquire_lock();  // if lock is free, it becomes true (locked)

    // Step 5.3: Now we are inside the critical section
    printf("Process 1 acquired the lock.\n");
    printf("Process 1 is doing some work in the critical section...\n");

    // Critical section: the part where shared resources are used
    for (int i = 0; i < 3; i++) {
        printf("Working... step %d\n", i + 1);
    }

    // Step 5.4: Work done — release the lock
    printf("Process 1 releasing the lock.\n");
    release_lock();  // set lock back to false (free)

    // Step 5.5: Lock is free again
    printf("Lock released. Process 1 finished its work.\n");

    // End of program
    return 0;
}

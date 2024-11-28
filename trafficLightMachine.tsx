import {assign, createMachine} from 'xstate';

export const trafficLightMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAZpglgYwBkcoALZAOlUgGIBlAdQEkAVAYQAkBtABgF1FQABwD2sHMhzCAdgJAAPRAFoALAA5u5VQFYAnAGYA7FoCMW7uq1aANCACeiZXvLHuy4zuWuATDu7HVygC+gTZoWLiExGSUNABKAKIACgCCjLE8-EggImIS0rIKCCrqmrqGJmYW1nZKXnoAbOTc9V5qqjpeXlrKnXrBoRjY+ESkFFQQAJpgADbTwgDudExsXHyyOeKSMlmFinXG5Dr1qgYG3EfcrlqdNvYIyjrk1+Za9TqWqsYGqvX9IGFDSKjGKTGZzRYJFJpDLrUSbfI7Wp6A5HE5nC5XG41IrGUzkZGteo9Dr6VR6Pohf6DCIjaJQKhgKRLFgcGFZDZ5bagXbGLz4ryfAx6YntAz1AzKW6ISyHcruH4nckeP4AmlRCj0sCM6iQ1LpNbsuGcgpKXn8wXCnyi8WS7FaciOIw9PQ6XmGY5aFXU4bq8i2MELZkrNlCI1bE04vl6AVfS06a0SqUIL4aLxnAKvDyvX6U1U+4H+2aB3XQg2h3LhxEILy4w41z4PZFk45eJPGFrOE4meq4h5kgVe8L56JUQToHCoHXxWjMZKxZgh7JhhHcxA1lH14yN-wNVSt7GKPSvTS8h6vZoGfytYKUqTCCBwWR5oFkWEVlfyJT1QylfRGJMqMoyj4qeOhgeB4FBLm3ovmMkBvvCXKfkUWjtL+5Rtro5AGF4LytCYyKXoOgK0nBoJFvMCHGlWh5aAYzieESeiuBm3CvEmjjkPUrjuJ4xJ+AExFqsCmqMlRlarji5jkF0lx6Ko2hir4DRJmYTS4dobwfF8PxCcOFCFuC4kfoUuIHC6bGoeK+E4dUdztnyxxGO2vbxtGqh6bBMRjhOxlIYUR6Oa0OgGPoqHxo4AHGEeJ6EicdQdFuFLBEAA */
    id: 'trafficLight',
    initial: 'red',
    context: {
      timesBroken: 0,
    },
    states: {
      red: {
        on: {
          SWITCH: 'redYellow',
          REPAIR: 'repair',
        },
      },

      redYellow: {
        on: {
          SWITCH: 'green',
          REPAIR: 'repair',
        },
      },

      green: {
        on: {
          SWITCH: 'yellow',
          REPAIR: 'repair',
        },
      },

      yellow: {
        on: {
          SWITCH: 'red',
          REPAIR: 'repair',
        },
      },

      repair: {
        entry: assign({ timesBroken: ({ context }) => context.timesBroken + 1}),
        on: {
          RESTART: 'red',
        },
      }
    },
  },
);

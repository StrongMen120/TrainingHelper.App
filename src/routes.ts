import { format } from 'date-fns';
export enum RootModules {
  Exercise = '/exercises',
  User = '/user',
}
export const Routes = Object.freeze({
  dashboard: {
    root: `/dashboard`,
    plans:'/plans',
    startPlan:`/plans/start`
  },
  exercise: {
    exercises:`${RootModules.Exercise}/exercise`,
    doneExercise:`${RootModules.Exercise}/done`,
    records:`${RootModules.Exercise}/records`,
    statistics:`${RootModules.Exercise}/statistics`,
  },
  user: {
    root: `${RootModules.User}`,
    users: `${RootModules.User}/users`,
    groups: `${RootModules.User}/groups`,
    registry: `${RootModules.User}/registry`,
    profile: `${RootModules.User}/profile`,
  },
});

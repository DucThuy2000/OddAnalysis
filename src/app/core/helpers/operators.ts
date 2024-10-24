import { Observable, combineLatest, map } from 'rxjs';

export function vmFromLatest<TVm extends {}, TComputedVm extends {} = any>(
  vmBase: { [K in keyof TVm]: Observable<TVm[K]> },
  manipulateFunction?: (vmBaseReturn: TVm) => TComputedVm
): Observable<TVm & TComputedVm> {
  return combineLatest(Object.values(vmBase)).pipe(
    map((responses) => {
      const returnVm = Object.keys(vmBase).reduce((vm: any, key, index) => {
        vm[key] = responses[index];
        return vm;
      }, {} as TVm);

      if (manipulateFunction) {
        const manipulatedVm = manipulateFunction(returnVm);
        return Object.assign(returnVm, manipulatedVm) as TVm & TComputedVm;
      }

      return returnVm as TVm & TComputedVm;
    })
  );
}

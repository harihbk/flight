import { Subject } from 'rxjs';

const Completed =new Subject()

export const completeservice = {
    comborevent: data => Completed.next(data),
    comboempty: ()  => Completed.next(),
    comboObservable: () => Completed.asObservable()
}



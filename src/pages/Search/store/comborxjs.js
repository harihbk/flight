import { Subject } from 'rxjs';


const subject = new Subject();
const ComboStopService$ = new Subject();
const CombodeparturearrivalService$ = new Subject();


export const comboService = { 
    comborevent: data => subject.next(data),
    comboempty: ()  => subject.next(),
    comboObservable: () => subject.asObservable()
}

export const ComboStopService = { 
    combostopsevent: data => ComboStopService$.next(data),
    combostopempty: ()  => ComboStopService$.next(),
    combostopObservable: () => ComboStopService$.asObservable()
}

export const CombodeparturearrivalService = { 
    combostopsevent: data => CombodeparturearrivalService$.next(data),
    combostopempty: ()  => CombodeparturearrivalService$.next(),
    combostopObservable: () => CombodeparturearrivalService$.asObservable()
}


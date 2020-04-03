export enum EventSubtype {
    BlockOfTextReceived = 'Char.Vitals',
    AfflictionReceived = 'Char.Afflictions.Add',
    AfflictionCured = 'Char.Afflictions.Remove',
    DefenceActivated = 'Char.Defences.Add',
    DefenceList = 'Char.Defences.Remove',
    PlayerArrived = 'Room.AddPlayer',
    PlayerLeft = 'Room.RemovePlayer',
    RoomChanged = 'Room.Info',
    TargetChanged = 'IRE.Target.Set'
}

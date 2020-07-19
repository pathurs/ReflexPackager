import { BasePackage } from 'system-service/system-service';

interface CombatManagerSettings {
    enabled: boolean;
}

interface CombatManager extends BasePackage<CombatManagerSettings> {

}

export type CombatManagerClient = typeof client & {
    combatManager: CombatManager;
};

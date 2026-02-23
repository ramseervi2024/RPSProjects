import { create } from 'zustand';

const useFleetStore = create((set) => ({
    vehicles: [
        {
            id: '1',
            plateNumber: 'TX-4092-B',
            model: 'Volvo FH16',
            status: 'Active',
            fuelLevel: 82,
            battery: 94,
            lastLocation: { latitude: 37.7749, longitude: -122.4194 },
            avgCost: 1240,
            rating: 4.8,
            costHistory: [1100, 1300, 1200, 1400, 1240],
            health: { engine: 92, tires: 85, electronics: 98 },
            nextService: '12 Apr 2024'
        },
        {
            id: '2',
            plateNumber: 'CA-8812-C',
            model: 'Scania R500',
            status: 'Maintenance',
            fuelLevel: 45,
            battery: 68,
            lastLocation: { latitude: 37.7833, longitude: -122.4167 },
            avgCost: 1850,
            rating: 4.2,
            costHistory: [1700, 1900, 1800, 2000, 1850],
            health: { engine: 45, tires: 72, electronics: 88 },
            nextService: 'In Progress'
        },
        {
            id: '3',
            plateNumber: 'NY-5521-A',
            model: 'Mercedes Actros',
            status: 'Active',
            fuelLevel: 91,
            battery: 89,
            lastLocation: { latitude: 37.7583, longitude: -122.4367 },
            avgCost: 980,
            rating: 4.9,
            costHistory: [900, 1000, 950, 1100, 980],
            health: { engine: 98, tires: 91, electronics: 95 },
            nextService: '25 May 2024'
        },
    ],
    drivers: [
        { id: '1', name: 'James Wilson', status: 'On Duty', phone: '+1 555-0101', rating: 4.9, experience: '8 yrs', safetyScore: 98, trips: 142 },
        { id: '2', name: 'Sarah Miller', status: 'Resting', phone: '+1 555-0102', rating: 4.7, experience: '5 yrs', safetyScore: 95, trips: 118 },
        { id: '3', name: 'Robert Chen', status: 'On Duty', phone: '+1 555-0103', rating: 4.8, experience: '12 yrs', safetyScore: 99, trips: 256 },
    ],
    trips: [
        {
            id: '1',
            target: 'Oakland Hub → Port Terminal',
            driver: 'James Wilson',
            status: 'Moving',
            time: '2h 15m left',
            origin: { latitude: 37.8044, longitude: -122.2712 },
            destination: { latitude: 37.7749, longitude: -122.4194 },
            route: [
                { latitude: 37.8044, longitude: -122.2712 },
                { latitude: 37.7950, longitude: -122.3300 },
                { latitude: 37.7850, longitude: -122.3800 },
                { latitude: 37.7749, longitude: -122.4194 },
            ],
            cost: 450,
        },
        {
            id: '2',
            target: 'Warehouse B → City Center',
            driver: 'Robert Chen',
            status: 'Idle',
            time: 'Scheduled',
            origin: { latitude: 37.7833, longitude: -122.4167 },
            destination: { latitude: 37.7583, longitude: -122.4367 },
            route: [
                { latitude: 37.7833, longitude: -122.4167 },
                { latitude: 37.7700, longitude: -122.4250 },
                { latitude: 37.7583, longitude: -122.4367 },
            ],
            cost: 210,
        },
    ],
    maintenanceHistory: [
        { id: 'm1', vehicleId: '1', date: '10 Feb 2024', type: 'Oil Change', cost: 150, status: 'Completed' },
        { id: 'm2', vehicleId: '2', date: '22 Feb 2024', type: 'Engine Check', cost: 850, status: 'Completed' },
        { id: 'm3', vehicleId: '3', date: '05 Mar 2024', type: 'Tire Rotation', cost: 220, status: 'Completed' },
    ],
    activeAlerts: [
        { id: 'a1', type: 'Speeding', vehicle: 'TX-4092-B', driver: 'James Wilson', time: '2m ago', severity: 'Critical' },
        { id: 'a2', type: 'Hard Braking', vehicle: 'NY-5521-A', driver: 'Robert Chen', time: '15m ago', severity: 'Warning' },
        { id: 'a3', type: 'Low Fuel', vehicle: 'CA-8812-C', driver: 'Sarah Miller', time: '1h ago', severity: 'Warning' },
    ],
    logs: [],

    addVehicle: (vehicle) => set((state) => ({
        vehicles: [{
            ...vehicle,
            id: Math.random().toString(36).substr(2, 9),
            fuelLevel: 100,
            battery: 100,
            lastLocation: { latitude: 37.7749, longitude: -122.4194 },
            avgCost: 0,
            rating: 5.0,
            costHistory: [0, 0, 0, 0, 0],
            health: { engine: 100, tires: 100, electronics: 100 },
            nextService: 'Not Scheduled'
        }, ...state.vehicles]
    })),

    addDriver: (driver) => set((state) => ({
        drivers: [{
            ...driver,
            id: Math.random().toString(36).substr(2, 9),
            status: 'Off Duty',
            rating: 5.0,
            safetyScore: 100,
            trips: 0
        }, ...state.drivers]
    })),

    addTrip: (trip) => set((state) => ({
        trips: [{
            ...trip,
            id: Math.random().toString(36).substr(2, 9),
            time: 'Just Started',
            origin: { latitude: 37.7749, longitude: -122.4194 },
            destination: { latitude: 37.8044, longitude: -122.2712 },
            route: [
                { latitude: 37.7749, longitude: -122.4194 },
                { latitude: 37.7850, longitude: -122.3800 },
                { latitude: 37.7950, longitude: -122.3300 },
                { latitude: 37.8044, longitude: -122.2712 },
            ],
            cost: Math.floor(Math.random() * 500) + 100
        }, ...state.trips]
    })),

    logMaintenance: (entry) => set((state) => ({
        maintenanceHistory: [{ id: Date.now().toString(), ...entry, status: 'Completed' }, ...state.maintenanceHistory]
    })),

    clearAlert: (alertId) => set((state) => ({
        activeAlerts: state.activeAlerts.filter(a => a.id !== alertId)
    })),

    updateVehicleStatus: (id, status) => set((state) => ({
        vehicles: state.vehicles.map((v) => v.id === id ? { ...v, status } : v)
    })),

    addLog: (log) => set((state) => ({ logs: [log, ...state.logs] })),
}));

export default useFleetStore;

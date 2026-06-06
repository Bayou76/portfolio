<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Experience;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $experiences = [
            [
                'company'     => 'KOESIO Corporate IT',
                'role'        => 'Technicien déploiement informatique',
                'location'    => 'Caen (14)',
                'start_date'  => '2023-05-01',
                'end_date'    => '2023-06-30',
                'description' => 'Mission d\'intérim. Installation de matériel informatique, organisation logistique et coordination.',
                'order'       => 1,
            ],
            [
                'company'     => 'Délices Pizzas',
                'role'        => 'Stagiaire développeur web',
                'location'    => 'Gacé (61)',
                'start_date'  => '2022-09-01',
                'end_date'    => '2022-10-31',
                'description' => 'Rédaction du cahier des charges. Conception et développement d\'un site vitrine (HTML, CSS, JavaScript). Intégration de nouvelles fonctionnalités back-end, tests, documentation technique et mise en production.',
                'order'       => 2,
            ],
            [
                'company'     => 'Délices Pizzas',
                'role'        => 'Stagiaire développeur web',
                'location'    => 'Gacé (61)',
                'start_date'  => '2022-01-01',
                'end_date'    => '2022-02-28',
                'description' => 'Intégration de nouvelles fonctionnalités côté back-end. Tests, documentation technique, mise en production.',
                'order'       => 3,
            ],
            [
                'company'     => 'Cabinet B. Boulanger',
                'role'        => 'Aide-comptable',
                'location'    => 'Rouen (76)',
                'start_date'  => '2018-12-01',
                'end_date'    => '2019-12-31',
                'description' => 'Facturation, rapprochements bancaires, gestion de dossiers clients.',
                'order'       => 4,
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::create($exp);
        }
    }
}
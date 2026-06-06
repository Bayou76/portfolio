<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Formation;

class FormationSeeder extends Seeder
{
    public function run(): void
    {
        $formations = [
            [
                'school'      => 'CESI de Caen',
                'diploma'     => 'Bachelor Concepteur Développeur d\'Applications',
                'field'       => '3ème année — en cours',
                'year_start'  => 2024,
                'year_end'    => null,
                'description' => 'Formation en alternance orientée développement full stack et architecture logicielle.',
            ],
            [
                'school'      => 'OpenClassroom',
                'diploma'     => 'Titre professionnel Développeuse d\'applications JavaScript / React',
                'field'       => 'Développement front-end',
                'year_start'  => 2023,
                'year_end'    => 2024,
                'description' => 'Développement d\'applications web avec JavaScript et React. Gestion d\'état, hooks, API REST.',
            ],
            [
                'school'      => 'Via Formation',
                'diploma'     => 'Titre professionnel Développeuse Web & Web Mobile',
                'field'       => 'Hérouville-Saint-Clair (14)',
                'year_start'  => 2022,
                'year_end'    => 2023,
                'description' => 'Formation complète au développement web front-end et mobile.',
            ],
            [
                'school'      => 'Université de Caen',
                'diploma'     => 'L1 Informatique',
                'field'       => null,
                'year_start'  => 2021,
                'year_end'    => 2022,
                'description' => null,
            ],
            [
                'school'      => 'Lycée Flaubert, Rouen',
                'diploma'     => 'Baccalauréat STG — Comptabilité & Finance des Entreprises',
                'field'       => null,
                'year_start'  => 2013,
                'year_end'    => 2013,
                'description' => null,
            ],
        ];

        foreach ($formations as $formation) {
            Formation::create($formation);
        }
    }
}
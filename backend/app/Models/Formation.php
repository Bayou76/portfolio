<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    protected $fillable = [
        'school', 'diploma', 'field',
        'year_start', 'year_end', 'description'
    ];
}